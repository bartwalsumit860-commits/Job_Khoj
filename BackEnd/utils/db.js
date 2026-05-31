import dns from "node:dns";
import mongoose from "mongoose";

let reconnectTimer = null;
let dnsFallbackApplied = false;

const getConnectionCandidates = () => [
    process.env.MONGO_URL?.trim(),
    process.env.MONGO_URI?.trim(),
].filter(Boolean);

const getMongoDnsServers = () => {
    const configuredServers = process.env.MONGO_DNS_SERVERS
        ?.split(",")
        .map((server) => server.trim())
        .filter(Boolean);

    if (configuredServers?.length) {
        return configuredServers;
    }

    return ["1.1.1.1", "8.8.8.8"];
};

const maskMongoUrl = (mongoUrl) => {
    try {
        const url = new URL(mongoUrl);
        if (url.username) {
            url.username = "***";
        }
        if (url.password) {
            url.password = "***";
        }
        return url.toString();
    } catch {
        return mongoUrl;
    }
};

const scheduleReconnect = () => {
    if (reconnectTimer) {
        return;
    }

    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connectDB().catch(() => {});
    }, 15000);

    reconnectTimer.unref?.();
};

const isDnsRelatedMongoError = (message = "") => {
    return /querySrv|ENOTFOUND|EAI_AGAIN|getaddrinfo|DNS/i.test(message);
};

const applyMongoDnsFallback = () => {
    if (dnsFallbackApplied) {
        return false;
    }

    const dnsServers = getMongoDnsServers();

    if (dnsServers.length === 0) {
        return false;
    }

    dns.setServers(dnsServers);
    dnsFallbackApplied = true;
    console.warn(`MongoDB SRV lookup retrying with DNS servers: ${dnsServers.join(", ")}`);
    return true;
};

const attemptMongoConnection = async (mongoUrl) => {
    await mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
    });
};

const connectDB = async () => {
    const connectionCandidates = getConnectionCandidates();

    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB already connected.");
        return true;
    }

    if (connectionCandidates.length === 0) {
        console.error("No MongoDB connection string found in MONGO_URL or MONGO_URI.");
        return false;
    }

    console.log("Connecting to MongoDB...");

    for (const mongoUrl of connectionCandidates) {
        try {
            console.log(`Trying MongoDB: ${maskMongoUrl(mongoUrl)}`);
            await attemptMongoConnection(mongoUrl);
            console.log(`mongodb connected successfully: ${maskMongoUrl(mongoUrl)}`);
            return true;
        } catch (error) {
            console.error(`MongoDB connection failed for ${maskMongoUrl(mongoUrl)}:`, error.message);

            if (mongoUrl.startsWith("mongodb+srv://") && isDnsRelatedMongoError(error.message) && applyMongoDnsFallback()) {
                try {
                    console.log(`Retrying MongoDB with alternate DNS: ${maskMongoUrl(mongoUrl)}`);
                    await attemptMongoConnection(mongoUrl);
                    console.log(`mongodb connected successfully: ${maskMongoUrl(mongoUrl)}`);
                    return true;
                } catch (retryError) {
                    console.error(`MongoDB retry failed for ${maskMongoUrl(mongoUrl)}:`, retryError.message);
                }
            }
        }
    }

    console.warn("MongoDB connection unavailable right now; retrying in the background.");
    if (connectionCandidates.length > 0) {
        scheduleReconnect();
    }
    return false;
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected.");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Retrying connection...");
    scheduleReconnect();
});

export default connectDB;

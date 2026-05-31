import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "rgb(255 255 255)",
          "--normal-text": "rgb(15 23 42)",
          "--normal-border": "rgb(226 232 240)",
          "--border-radius": "1rem"
        }
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:rounded-2xl group-[.toaster]:border group-[.toaster]:border-slate-200 group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:shadow-2xl",
          description: "group-[.toast]:text-slate-600",
          title: "group-[.toast]:font-semibold",
          actionButton: "group-[.toast]:bg-slate-900 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-700",
        },
      }}
      {...props} />
  );
}

export { Toaster }

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const categories = [
    "FrontEnd Developer",
    "Backend Developer",
    "Software Architect",
    "UI/UX Designer",
    "Data Scientist",
    "FullStack Developer"
]

const CategoryCarousel = () => {

    return (
        <>
            <Carousel className='w-full mx-auto my-10 max-w-xl'>
                <CarouselContent>
                    {
                        categories.map((category) => (
                            <CarouselItem key={category} className='md:basis-1/2 lg:basis-1/3'>
                                <Button variant="outline" className='rounded-full'>{category}</Button>
                            </CarouselItem>
                        )
                        )
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </>
    )
}

export default CategoryCarousel

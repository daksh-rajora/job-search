import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "Data Analyst"
]

const CategoryCarousel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchJobHandler = (query) => {
      dispatch(setSearchQuery(query));
      navigate("/browse");
    };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-5 md:my-20 px-10 md:px-0">
        <CarouselContent>
            {
                category.map((cat, index) => (
                    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/2 lg:basis-1/3 flex justify-center">
                        <Button onClick={() => searchJobHandler(cat)} variant='outline' className="rounded-full text-xs sm:text-sm w-full max-w-[150px] truncate">{cat}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
         <CarouselPrevious className="left-2 md:-left-12" />
         <CarouselNext className="right-2 md:-right-12" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel

'use client'

import { TransformedDishesMenu } from "../../../sanity.types.custom";
import { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { PortableText } from "next-sanity";
import AOSComponent from "../AOS";
import { useFormatter } from "next-intl"
import { motion, AnimatePresence } from "framer-motion";

import { components } from "../PortableTextComponents";

export default function DishesMenu({ item }: { item: TransformedDishesMenu }) {
  const format = useFormatter();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const categories = useMemo(() => item.menu?.categories || [], [item.menu?.categories]);
  
  const filteredDishes = useMemo(() => {
    return categories[selectedCategoryIndex]?.dishes || [];
  }, [categories, selectedCategoryIndex]);

  return (
    <AOSComponent>
      <div className="dishes-menu-container pb-20" data-aos="fade-up" data-aos-delay="200">
        <h2 className="family-playfair text-white text-center py-5">{item.menu?.title}</h2>
        {item.menu?.introText && (
          <div className="px-5 pb-10">
            <PortableText value={item.menu?.introText || []} components={components} />
          </div>
        )}
        
        {/* Category Filter */}
        <ul className="filter-list flex justify-center flex-wrap pb-10">
          {categories.map((category, index) => (
            <li 
              key={index} 
              onClick={() => setSelectedCategoryIndex(index)} 
              className={`filter-item cursor-pointer text-center flex flex-col md:px-5 px-2 pb-5 justify-center items-center transition-all duration-300 ${selectedCategoryIndex === index ? "active scale-110" : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"}`}
            >
              {category.flaticonClass ? (
                <i className={`${category.flaticonClass} md:text-5xl text-4xl text-center md:mb-5 mb-2 transition-colors duration-300 ${selectedCategoryIndex === index ? 'text-gold' : 'text-white'}`}></i>
              ) : (
                <Icon 
                  icon={category.icon?.name || 'ph:bowl-food'} 
                  className={`md:text-5xl text-4xl text-center md:mb-5 mb-2 transition-colors duration-300 ${selectedCategoryIndex === index ? 'text-gold' : 'text-white'}`} 
                />
              )}
              <h3 className={`uppercase md:text-2xl text-md font-bold tracking-widest transition-colors duration-300 ${selectedCategoryIndex === index ? 'text-foreground' : 'text-gold'}`}>
                {category.title}
              </h3>
            </li>
          ))}
        </ul>

        {/* Dishes Grid */}
        <div className="filter-container flex flex-wrap justify-start min-h-[400px] md:px-10 px-4">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish, idx) => (
              <motion.div
                key={`${selectedCategoryIndex}-${idx}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="filter-item w-full md:w-[calc(50%-40px)] m-5 text-left border-b border-gold/20 pb-5"
              >
                <div className="flex justify-between items-baseline gap-4 mb-2">
                  <h4 className="family-playfair text-gold uppercase font-bold text-xl tracking-wide">
                    {dish.title}
                  </h4>
                  {dish.price && (
                    <span className="price text-foreground font-bold">
                      {format.number(dish.price, { style: 'currency', currency: 'EUR' })}
                    </span>
                  )}
                </div>
                {dish.description && (
                  <div className="dish-description text-sm leading-relaxed">
                    {dish.description}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </AOSComponent>
  )
}
'use client'

import { DishesMenuForPageMaker } from "../../../sanity.types.custom";
import { useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';
import { PortableText } from "next-sanity";
import AOSComponent from "../AOS";
import { useFormatter } from "next-intl"

export default function DishesMenu({item}: {item: DishesMenuForPageMaker}) {
  const uuid = item._ref; // Use _ref
  // Initialize Isotope
  const format = useFormatter();
  const isotope = useRef<Isotope | null>();
  const [filterKey, setFilterKey] = useState<string>("cat-0-" + uuid);
  useEffect(() => {
    (async () => {
      console.log("Initializing Isotope for DishesMenu with uuid:", uuid);
      if (isotope.current) {
        isotope.current.destroy(); // Destroy previous instance if it exists
      }
      const Isotope = (await import('isotope-layout')).default;
      isotope.current = new Isotope(`#filter-container-${uuid}`, {
        itemSelector: `#filter-container-${uuid} .filter-item`,
        layoutMode: 'fitRows',
        filter: `.${filterKey}`,
      });
    })();
  }, [isotope]);

  useEffect(() => {
    if (isotope) {
      isotope.current?.arrange({ filter: `.${filterKey}` });
    }
  }, [isotope, filterKey]);

  const handleFilterKeyChange = (filter: string) => () => setFilterKey(filter);

  return (
    <AOSComponent>
      <div className="dishes-menu-container pb-20" data-aos="fade-up" data-aos-delay="200">
        <h2 className="family-matura-sc text-gold text-center py-5">{item.menu?.title}</h2>
        {item.menu?.introText && (
          <div className="text-center px-5 pb-10">
            <PortableText value={item.menu?.introText || []} />
          </div>
        )}
        <ul className="filter-list flex justify-center flex-wrap pb-10">
          {item.menu?.categories?.map((category, index) => (
            <li key={index} onClick={handleFilterKeyChange('cat-' + index + '-' + uuid)} className={'filter-item cursor-pointer text-center flex flex-col md:px-5 px-2 pb-5 justify-center items-center' + (filterKey === 'cat-' + index + '-' + uuid ? " active" : "")}>
              <Icon icon={category.icon?.name || 'mdi:food'} className="md:text-5xl text-4xl text-center md:mb-5 mb-2 text-white" />
              <h6 className="text-gold uppercase md:text-2xl text-md">{category.title}</h6>
            </li>
          ))}
        </ul>
        <div className="filter-container text-center" id={`filter-container-${uuid}`}>
          {item.menu?.categories?.map((category, index) =>
            category.dishes?.map((dish, idx) => (
              <div key={'dish-' + idx} className={`filter-item cat-${index}-${uuid} border-b-2 border-dotted border-gold pt-0 md:p-[15px]`}>
                <h6 className="md:text-2xl text-xl family-matura-sc text-gold">{dish.title} {dish.price && format.number(dish.price, {style: 'currency', currency: 'EUR'})}</h6>
                <div className="dish-description m-2">{dish.description || dish.title}</div>
                <p className="text-lg"></p>
              </div>
            )
          ))}
        </div>
      </div>
    </AOSComponent>
  )
}
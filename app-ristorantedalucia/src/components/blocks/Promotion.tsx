import Link from 'next/link';
import type { Promotion as P } from '../../../sanity.types';
import InfiniteLooper from '../InfiniteLooper';

type PromotionProps = Omit<P, 'title'> & { 
  title?: string;
};

export default function Promotion({item}: {item: PromotionProps}) {
  return (
    <InfiniteLooper speed={10} direction={item?.direction || 'left'}>
        {item?.link ? (<Link href={item?.link || '#'} target='__blank'>{item.title}</Link>) : item.title}
    </InfiniteLooper>
  )
}
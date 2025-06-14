import Link from 'next/link';
import type { Promotion as P } from '../../../sanity.types';
import InfiniteLooper from '../InfiniteLooper';

export default function Promotion({item}: {item: P}) {
  return (
    <InfiniteLooper speed={10} direction={item?.direction || 'left'}>
        {item?.link ? (<Link href={item?.link || '#'} target='__blank'>{item.title}</Link>) : item.title}
    </InfiniteLooper>
  )
}
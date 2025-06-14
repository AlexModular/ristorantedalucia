import { Video as V } from "../../../sanity.types";
import { getFileAsset, buildFileUrl, SanityFileSource } from "@sanity/asset-utils";

export default function Video(params: {key: number, item: V }) {
  const { item } = params;
  const opts = {projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET};
  const fileAsset = item?.file ? getFileAsset(item.file as SanityFileSource, opts) : null;
  const fileUrl = fileAsset ? buildFileUrl(fileAsset, opts) : '';
  return (
    <video className={item?.cssClasses} autoPlay muted loop title={item?.videoLabel}>
      <source src={fileUrl} type="video/mp4" />
    </video>
  );
}
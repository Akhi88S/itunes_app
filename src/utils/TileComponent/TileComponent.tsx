import "./tilecomponent.scss";

const Tile = (props: TileProps) => {
  const { imgSrc, imgHeight, name } = props;

  return (
    <div className="tile_container">
      <img className="tile_cover" src={imgSrc} height={imgHeight} alt={name} />
      <p className="tile_name">{name}</p>
    </div>
  );
};
export default Tile;

type TileProps = {
  name: string;
  imgSrc?: string;
  imgHeight?: number;
};

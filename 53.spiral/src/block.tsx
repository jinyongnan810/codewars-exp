const Block = ({ snake }: { snake: boolean }) => {
  return snake ? <div className="snake"></div> : <div className="block"></div>;
};

export default Block;

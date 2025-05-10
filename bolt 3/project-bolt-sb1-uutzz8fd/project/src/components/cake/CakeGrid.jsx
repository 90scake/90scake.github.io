import { useCakes } from '../../context/CakeContext';
import CakeCard from './CakeCard';

const CakeGrid = () => {
  const { cakes } = useCakes();
  
  if (!cakes?.length) {
    return (
      <div className="my-8 text-center">
        <p className="text-lg text-gray-600">No cakes available at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cakes.map((cake) => (
        <CakeCard key={cake.id} cake={cake} />
      ))}
    </div>
  );
};

export default CakeGrid;
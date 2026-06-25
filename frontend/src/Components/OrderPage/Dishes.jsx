import { useEffect, useState } from 'react';
import { getDish } from '../../api/itemApi';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const Dishes = () => {
  const [menuItem, setMenuItem] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await getDish();
        setMenuItem(data);
        setFilter(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const handleFilterChange = (category) => {
    if (category === 'All') {
      setFilter(menuItem);
    } else {
      const result = menuItem.filter((val) => val.category === category);
      setFilter(result);
    }
  };

  return (
    <div>
      <MenuHeader onFilterChange={handleFilterChange} />
      <MenuItem menuItem={filter} />
    </div>
  );
};

export default Dishes;
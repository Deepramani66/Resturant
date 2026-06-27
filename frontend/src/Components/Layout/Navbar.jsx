import StaggeredMenu from '../LandingPage/staggerdMenu/Menu.jsx';
import img from '../../assets/LandingImg/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const nav = useNavigate();

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', onClick: () => nav('/') },
    { label: 'Order', ariaLabel: 'Learn about us', onClick: () => nav('/order-item') },
    { label: 'Services', ariaLabel: 'View our services'},
    { label: 'Contact', ariaLabel: 'Get in touch'}
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <div className="h-[18vh] border-b border-[rgba(222,184,135,0.3)] max-sm:h-[14vh]">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#fff958ff', '#ff0000']}
        logoUrl={img}
        accentColor="#5227FF"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  );
};

export default Navbar;
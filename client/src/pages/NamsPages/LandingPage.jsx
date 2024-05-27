import Footer from '../../components/NamsComponents/Footer';
import MainContent from './MainContent';
import Sidebar from './Sidebar';
import UserPanel from './UserPanel';

import '../../ChatApp.css';
import '../../App.css';

const LandingPage = () => {
  return (
    <>
      <div className="landingPage">
        <Sidebar />
        <MainContent />
        <UserPanel />
      </div>

      <footer>{<Footer />}</footer>
    </>
  );
};

export default LandingPage;

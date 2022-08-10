import Footer from '../components/footer';
import Nav from '../components/nav';

export default function Layout({ children, navigation }) {
  return (
    <>
      {/* <Nav navigation={navigation}/> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}

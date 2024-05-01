import Layout from "../components/Layout/Layout";

const Index = ({ strapiData }) => {
  return (
    <Layout>
      <h1>Willkommen beim TTC-Klingenmünster</h1>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      strapiData: "",
    },
  };
}

export default Index;

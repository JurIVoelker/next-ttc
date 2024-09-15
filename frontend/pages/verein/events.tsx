import Event from "../../components/Event/Event";
import { getRequest } from "../../utils/strapi";

const Events = ({ strapiData, events }) => {
  const { title, description } = strapiData;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          marginTop: "4rem",
        }}
      >
        {events.map((event, id) => (
          <Event key={id} {...event.attributes} />
        ))}
      </div>
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const strapiData = await getRequest("events-page?populate=deep");
  const events = await getRequest("events?populate=*&sort[0]=dateFrom:desc");

  return {
    props: {
      strapiData: strapiData.data.attributes,
      events: events.data,
    },
    revalidate: 600,
  };
}

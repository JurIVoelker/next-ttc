import Event from "../../components/Event/Event";
import { getRequest } from "../../utils/strapi";

const Events = ({ strapiData, events }) => {
  const { title, description } = strapiData;
  const filteredEvents = events.filter((event) => {
    const dateFrom = new Date(event.attributes.dateFrom);
    const dateTo = event.attributes.dateTo
      ? new Date(event.attributes.dateTo)
      : null;
    const today = new Date(new Date().setHours(0, 0, 0, 0)); // Set time to midnight for comparison
    if (dateTo === null) return dateFrom > today;
    return dateTo > today;
  });
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
        {filteredEvents.map((event, id) => (
          <Event key={id} {...event.attributes} />
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-gray-500">Keine kommenden Veranstaltungen.</p>
        )}
      </div>
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const strapiData = await getRequest("events-page?populate=deep");
  const events = await getRequest(
    "events?populate=*&sort[0]=dateFrom:asc&pagination[start]=0&pagination[limit]=999999"
  );

  return {
    props: {
      strapiData: strapiData.data.attributes,
      events: events.data,
    },
    revalidate: 600,
  };
}

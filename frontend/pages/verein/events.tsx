import Event from "../../components/Event/Event";
import { getRequest } from "../../utils/strapi";
import { EventAttributesType } from "../../types/strapiTypes";

const Events = ({ strapiData, events }) => {
  const { title, description } = strapiData;
  const filteredEvents = events.filter((event) => {
    const dateFrom = new Date(event.dateFrom);
    const dateTo = event.dateTo
      ? new Date(event.dateTo)
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
        {filteredEvents.map((event, id) => {
          // Strapi 5 adds id/documentId to entries. Don't pass them on as DOM attributes.
          const { id: _id, documentId: _documentId, ...attributes } = event;
          return <Event key={id} {...(attributes as EventAttributesType)} />;
        })}
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
      strapiData: strapiData.data,
      events: events.data,
    },
    revalidate: 600,
  };
}

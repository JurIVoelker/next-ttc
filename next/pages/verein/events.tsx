import Event from "../../components/Event/Event";
import { getRequest } from "../../utils/strapi";

const Events = ({ strapiData }) => {
  const { title, description, events } = strapiData;
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
        {events.map((event) => {
          const { id, inhalt, location, tags, titel, image, date } = event;
          return (
            <Event
              key={id}
              inhalt={inhalt}
              location={location}
              tags={tags}
              titel={titel}
              image={image}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const hallePageData = await getRequest("events-page?populate=deep");

  return {
    props: {
      strapiData: hallePageData.data.attributes,
    },
    revalidate: 600,
  };
}

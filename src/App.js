import { useState } from "react";
import "./App.css";
import { ImageCard } from "./components/ImageCard";
import { useGetImages } from "./controllers/useGetImages";
import { useEffect } from "react";
import { DateTimePicker } from "@atlaskit/datetime-picker";
import { LoadingButton as Button } from "@atlaskit/button";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import CountBox from "./components/CountBox";

function App() {
  const { getObjects, objectList } = useGetImages();
  const [startTime, setStartTime] = useState();
  const [loading, setLoading] = useState(false);
  const labelList = ["Car", "Person"];
  const [labelCounts, setLabelCounts] = useState({
    car: {
      name: "Car",
      count: 0,
    },
    person: {
      name: "Person",
      count: 0,
    },
  });

  useEffect(() => {
    //getObjects("1674120069000", "1674120069000");
    //1674115200000;
  }, [getObjects]);

  const getInstances = (labels, filterList = labelList) =>
    labels
      .map((label) => {
        const hasParent = label.Parents.find((parent) => filterList.includes(parent.Name));

        if (hasParent || filterList.includes(label.Name)) {
          return label;
        }

        return undefined;
      })
      .filter(Boolean);

  return (
    <div className='App'>
      <div className='header-container'>
        <SectionMessage appearance='warning' title='Resticition about app'>
          <p>
            Since we have some cost limitation on AWS, we can only select{" "}
            <span className='bold-text'>19/01/2023 12:30PM</span> time. Also, if we have enough resource we can run our
            app with more time.
            {/* <p>
              Also after selected started time app will get closes 10 images to us, again we are getting these images
              because we haven't enough resource.
            </p> */}
          </p>
        </SectionMessage>
        <SectionMessage title='Info About App'>
          <p>
            We are filering only <span className='bold-text'>Car</span> and <span className='bold-text'>Person</span>{" "}
            labels.
          </p>
        </SectionMessage>

        <div className='time-picker-container'>
          <DateTimePicker
            onChange={(event) => {
              setStartTime(new Date(event).getTime());
            }}
          />
        </div>

        <div className='button-class'>
          <Button
            isLoading={loading}
            appearance='primary'
            onClick={() => {
              if (startTime) {
                setLoading(true);
                getObjects(startTime, startTime)
                  .then((data) => {
                    setLoading(false);
                    let carCount = 0,
                      personCount = 0;
                    debugger;
                    data.map((item) => {
                      carCount += getInstances(item.labels, ["Car"]).length;
                      personCount += getInstances(item.labels, ["Person"]).length;
                    });

                    setLabelCounts({
                      car: {
                        ...labelCounts.car,
                        count: carCount,
                      },
                      person: {
                        ...labelCounts.person,
                        count: personCount,
                      },
                    });
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              }
            }}>
            Get Images
          </Button>
        </div>
      </div>
      <div className='box-container'>
        {Object.keys(labelCounts).map((item) => {
          return <CountBox count={labelCounts[item].count} title={labelCounts[item].name} />;
        })}
      </div>
      <div className={"grid-items"}>
        {objectList &&
          objectList.map((item, key) => {
            return <ImageCard imageId={item.id} key={key} labels={getInstances(item.labels)} />;
          })}
      </div>
    </div>
  );
}

export default App;

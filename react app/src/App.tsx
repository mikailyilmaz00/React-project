import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  // Handle item selection
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setAlertVisibility(true);
  };

  return (
    <div>
      {/* displaying Alert when an item is selected */}
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          {selectedItem
            ? `Selected Item: ${selectedItem}`
            : "Alert! Imposter item selected"}
        </Alert>
      )}

      {/*  listGroup with items */}
      <ListGroup
        items={items}
        heading="My List"
        onSelectItem={handleSelectItem}
      />

      {/* button to trigger alert manually */}
      <Button
        color="primary"
        onClick={() => {
          if (!selectedItem) {
            setSelectedItem("Alert! Imposter item selected");
          }
          setAlertVisibility(true);
        }}
      >
        Imposter item
      </Button>
    </div>
  );
}

export default App;

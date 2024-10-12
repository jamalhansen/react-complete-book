import { createContext, useState, useContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export const useAccordionContext = () => {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      "You must use the accordion component with wrapping Accordion"
    );
  }

  return ctx;
};

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  const toggleItem = (id) => {
    if (id === openItemId) {
      setOpenItemId(null);
    } else {
      setOpenItemId(id);
    }
  };

  const contextValue = {
    openItemId: openItemId,
    toggleItem,
  };
  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

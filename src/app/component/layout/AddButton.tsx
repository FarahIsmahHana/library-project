import { Button } from "../StyledComponent";

export default function AddButton({
  activeTab,
  handleAdd,
  handleBookAdd,
}: {
  activeTab: "loan" | "book";
  handleAdd: () => void;
  handleBookAdd: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 240,
        width: "calc(100% - 240px)",
        background: "#fff",
        padding: "16px 24px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        style={{
          background: "#2563eb",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          borderRadius: 20,
          padding: "8px 24px",
        }}
        onClick={activeTab === "loan" ? handleAdd : handleBookAdd}
      >
        Add
      </Button>
    </div>
  );
}

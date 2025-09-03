"use client";

import LoanHistoryTable from "../table/LoanHistoryTable";
import ListBukuTable from "../table/ListBukuTable";
import { Book, Loan } from "../types";

interface ContentAreaProps {
  activeTab: "loan" | "book";
  loans: Loan[];
  books: Book[];
  onEdit: (loan: Loan) => void;
  onMessage: (msg: { type: "success" | "error"; text: string }) => void;
}

export default function ContentArea({
  activeTab,
  loans,
  books,
  onEdit,
  onMessage,
}: ContentAreaProps) {
  return (
    <div
      className="overflow-auto p-6"
      style={{
        marginLeft: 240,
        marginTop: 30,
        marginRight: 16,
        height: "calc(100vh - 136px)",
      }}
    >
      {activeTab === "loan" && (
        <LoanHistoryTable data={loans} onEdit={onEdit} onMessage={onMessage} />
      )}
      {activeTab === "book" && <ListBukuTable books={books} />}
    </div>
  );
}

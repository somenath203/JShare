"use client";

import { Share2 } from "lucide-react";
import { LoaderCircle, Trash, Clipboard, FileJson } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const JsonHistoryTable = ({
  allJSONData,
  loadingAllJSONData,
  deleteJSONData,
  loadingDeleteJSONData,
  idOfTheJSONToBeDeleted,
}) => {
  const [openShareJSONModal, setOpenShareJSONModal] = useState(false);

  const [idOfTheJSONData, setIdOfTheJSONData] = useState(null);

  const [nameOfTheJSONData, setNameOfTheJSONData] = useState("");

  const copyJSONDataURLToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/view-particular-jsondata/${idOfTheJSONData}`,
    );

    toast.success("url successfully copied to clipboard.");
  };

  return (
    <>
      {loadingAllJSONData ? (
        <div className="flex items-center justify-center py-16">
          <LoaderCircle className="size-5 text-slate-400 animate-spin" />
        </div>
      ) : allJSONData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 border border-dashed border-slate-200 rounded-lg">
          <FileJson className="size-8 text-slate-300" />

          <p className="text-slate-500 text-sm">
            No JSON data yet. Add one to get started.
          </p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <Table>
            <TableCaption className="text-slate-400 text-xs pb-4">
              A list of your recent JSON data.
            </TableCaption>

            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-200">
                <TableHead className="text-left text-slate-500 font-medium">
                  Name
                </TableHead>
                <TableHead className="text-center text-slate-500 font-medium">
                  Share
                </TableHead>
                <TableHead className="text-center text-slate-500 font-medium">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allJSONData.map((data) => (
                <TableRow
                  key={data.id}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <TableCell className="text-left font-medium text-slate-800">
                    {data.name}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <button
                        className="inline-flex items-center justify-center size-8 rounded-md hover:bg-emerald-50 transition-colors"
                        onClick={() => {
                          setIdOfTheJSONData(data.id);

                          setNameOfTheJSONData(data.name);

                          setOpenShareJSONModal(true);
                        }}
                      >
                        <Share2 className="size-4 text-emerald-600" />
                      </button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      {loadingDeleteJSONData &&
                      idOfTheJSONToBeDeleted &&
                      data.id &&
                      idOfTheJSONToBeDeleted === data.id ? (
                        <div className="inline-flex items-center justify-center size-8">
                          <LoaderCircle className="size-4 text-red-500 animate-spin" />
                        </div>
                      ) : (
                        <button
                          className="inline-flex items-center justify-center size-8 rounded-md hover:bg-red-50 transition-colors"
                          onClick={() => deleteJSONData(data.id)}
                        >
                          <Trash className="size-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={openShareJSONModal}
        onOpenChange={setOpenShareJSONModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">
              Your JSON data URL
            </AlertDialogTitle>

            <AlertDialogDescription className="text-slate-500">
              Sharable link for your JSON data. Copy and share the link with
              your friend.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Alert className="border-slate-200 bg-slate-50">
            <AlertTitle className="text-center text-lg font-semibold text-slate-900 capitalize">
              {nameOfTheJSONData}
            </AlertTitle>

            <AlertDescription className="text-center">
              <Link href={`/view-particular-jsondata/${idOfTheJSONData}`}>
                <p className="text-sm text-emerald-700 tracking-wide break-all hover:underline">
                  {process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}
                  /view-particular-jsondata/${idOfTheJSONData}
                </p>
              </Link>

              <button
                className="mt-3 inline-flex items-center justify-center size-8 rounded-md hover:bg-emerald-50 transition-colors mx-auto"
                onClick={copyJSONDataURLToClipboard}
              >
                <Clipboard className="size-4 text-emerald-600" />
              </button>
            </AlertDescription>
          </Alert>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-50">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JsonHistoryTable;

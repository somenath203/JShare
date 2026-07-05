"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import axios from "axios";
import { LoaderCircle, Plus, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewJsonDataModal = ({ fetchAllJsonDataOfCurrentlyLoggedInUser }) => {
  const [openModal, setOpenModal] = useState(false);

  const [jsonNameInput, setJsonNameInput] = useState("");

  const [jsonDataInput, setJsonDataInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [showInvalidJsonDialog, setShowInvalidJsonDialog] = useState(false);

  const handleSaveJSONData = async () => {
    try {
      setLoading(true);

      if (jsonNameInput && jsonDataInput) {
        try {
          JSON.parse(jsonDataInput);
        } catch {
          setShowInvalidJsonDialog(true);

          return;
        }

        const { data } = await axios.post("/api/create-json", {
          name: jsonNameInput,
          content: jsonDataInput,
        });

        if (data?.success) {
          setJsonNameInput("");

          setJsonDataInput("");

          await fetchAllJsonDataOfCurrentlyLoggedInUser();

          setOpenModal(false);

          toast.success(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
      >
        <Plus className="size-4" />
        Add JSON data
      </Button>

      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">
              Create new JSON
            </AlertDialogTitle>

            <AlertDialogDescription className="text-slate-500">
              Save your JSON data
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label className="text-slate-700">Name of JSON data</Label>

              <Input
                placeholder="Enter your JSON name"
                className="rounded-md border-slate-200 focus-visible:ring-emerald-500"
                onChange={(e) => setJsonNameInput(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-slate-700">Enter the JSON data</Label>

              <CodeMirror
                value={jsonDataInput}
                extensions={[json()]}
                onChange={(value) => setJsonDataInput(value)}
                className="border border-slate-200 rounded-md shadow-sm h-96 overflow-y-auto"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="secondary"
              disabled={loading}
              onClick={() => setOpenModal(false)}
              className="border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Close
            </Button>

            <Button
              onClick={handleSaveJSONData}
              disabled={!jsonNameInput || !jsonDataInput || loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showInvalidJsonDialog}
        onOpenChange={setShowInvalidJsonDialog}
      >
        <AlertDialogContent className="w-[92vw] sm:w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600 text-lg">
              <XCircle className="size-5" />
              Invalid JSON format
            </AlertDialogTitle>

            <AlertDialogDescription className="text-slate-600 mt-1">
              This isn't valid JSON, so it can't be saved. Compare the examples
              below to see what needs to change.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="flex items-center gap-1.5 font-semibold text-red-600 mb-2 text-sm">
                <XCircle className="size-4" />
                Invalid JSON
              </h3>

              <pre className="rounded-md bg-red-50 border border-red-200 p-4 overflow-auto max-h-56 text-xs sm:text-sm leading-relaxed">
{`[
  { rollNo: 1, name: "Student A" },
  { rollNo: 2, name: "Student B" },
  { rollNo: 3, name: "Student C" },
  { rollNo: 4, name: "Student D" },
  { rollNo: 5, name: "Student E" },
  { rollNo: 6, name: "Student F" },
  { rollNo: 7, name: "Student G" },
  { rollNo: 8, name: "Student H" },
  { rollNo: 9, name: "Student I" },
  { rollNo: 10, name: "Student J" }
]`}
</pre>
            </div>

            <div>
              <h3 className="flex items-center gap-1.5 font-semibold text-emerald-600 mb-2 text-sm">
                <CheckCircle2 className="size-4" />
                Valid JSON
              </h3>

              <pre className="rounded-md bg-emerald-50 border border-emerald-200 p-4 overflow-auto max-h-56 text-xs sm:text-sm leading-relaxed">
{`[
  {
    "rollNo": 1,
    "name": "Student A"
  },
  {
    "rollNo": 2,
    "name": "Student B"
  },
  {
    "rollNo": 3,
    "name": "Student C"
  },
  {
    "rollNo": 4,
    "name": "Student D"
  },
  {
    "rollNo": 5,
    "name": "Student E"
  },
  {
    "rollNo": 6,
    "name": "Student F"
  },
  {
    "rollNo": 7,
    "name": "Student G"
  },
  {
    "rollNo": 8,
    "name": "Student H"
  },
  {
    "rollNo": 9,
    "name": "Student I"
  },
  {
    "rollNo": 10,
    "name": "Student J"
  }
]`}
</pre>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            
            <p className="font-medium mb-2">Common mistakes</p>

            <ul className="list-disc pl-5 space-y-1.5">
              <li>Property names must be wrapped in double quotes — <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">rollNo</code> should be <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">&quot;rollNo&quot;</code></li>
              <li>String values must use double quotes, not single quotes.</li>
              <li>Every object must be wrapped in <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">{`{ }`}</code></li>
              <li>Multiple objects must sit inside an array using <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">[ ]</code></li>
              <li>No trailing commas — remove the comma after the last item in an object or array.</li>
              <li>Comments aren't allowed in JSON, even <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">{`//`}</code> ones.</li>
            </ul>

          </div>

          <AlertDialogFooter>
            <Button
              onClick={() => setShowInvalidJsonDialog(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Got it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddNewJsonDataModal;

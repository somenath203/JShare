"use client";

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Code2,
  Share2,
  Eye,
  PlayCircle,
  LogIn,
  Pencil,
  Mail,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Lock,
    title: "Secure sign in",
    description:
      "Log in safely with Clerk before creating or managing your JSON.",
  },
  {
    icon: Code2,
    title: "Built-in editor",
    description: "Write and edit JSON in a code editor, not a plain textarea.",
  },
  {
    icon: Share2,
    title: "Shareable links",
    description: "Generate a link for any saved JSON in one click.",
  },
  {
    icon: Eye,
    title: "No login to view",
    description:
      "Anyone with the link can view the data — no account required.",
  },
];

const steps = [
  {
    icon: LogIn,
    title: "Sign in",
    description: "Log in with Clerk to access your dashboard.",
  },
  {
    icon: Pencil,
    title: "Write and save",
    description: "Name your JSON and write it in the built-in editor.",
  },
  {
    icon: Share2,
    title: "Share the link",
    description:
      "Copy the generated link — anyone can view it, no login needed.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6 pt-20 lg:pt-28">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-sm text-emerald-700 font-mono">
          <Braces className="w-3.5 h-3.5" />
          <span>JsonHive</span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 text-center tracking-tight">
          Share JSON.
          <br />
          Instantly.
        </h1>

        <p className="text-slate-500 text-base lg:text-lg text-center leading-relaxed max-w-lg">
          Write, save, and share JSON data with a simple link. Anyone with the
          link can view it—no login required.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <Link href="/dashboard">
            <Button className="py-6 px-8 text-base font-medium gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              Get started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          {/* <Link
            href=""
            target="_blank"
          >
            <Button
              variant="outline"
              className="py-6 px-8 text-base font-medium border-slate-200 text-slate-700 hover:bg-slate-50 gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Watch demo
            </Button>
          </Link> */}
        </div>

        <div className="w-full mt-12 rounded-xl border-2 border-green-600 bg-white overflow-hidden shadow-lg shadow-slate-200/50">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-base font-semibold text-slate-900 capitalize tracking-tight">
              My JSON data
            </h3>

            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-slate-500">Shared by</span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <Mail className="size-3 text-emerald-600" />
                somenathchoudhury38@gmail.com
              </span>
            </div>
          </div>

          <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
            <code>
              <span className="text-slate-400">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-sky-600">&quot;name&quot;</span>
              <span className="text-slate-400">: </span>
              <span className="text-emerald-600">&quot;Somenath Choudhury&quot;</span>
              <span className="text-slate-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-sky-600">&quot;role&quot;</span>
              <span className="text-slate-400">: </span>
              <span className="text-emerald-600">
                &quot;Full Stack Developer and AI Enthusiast&quot;
              </span>
              <span className="text-slate-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-sky-600">&quot;shared&quot;</span>
              <span className="text-slate-400">: </span>
              <span className="text-amber-600">true</span>
              {"\n"}
              <span className="text-slate-400">{"}"}</span>
            </code>
          </pre>

          <div className="flex items-center justify-center px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-mono">
              {process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/view-particular-jsondata/8fk2n1
            </span>
          </div>
        </div>

        <div className="w-full mt-16">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wide uppercase mb-6 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mt-1">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-16 mb-20">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wide uppercase mb-6 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-3 p-5 rounded-xl border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
              >
                <div className="flex items-center justify-center size-9 rounded-lg bg-emerald-50 border border-emerald-100">
                  <Icon className="size-4.5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

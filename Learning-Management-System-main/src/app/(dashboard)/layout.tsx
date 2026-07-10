"use client";

import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";

function DashboardMain({
  children,
  isCoursePage,
  courseId,
}: {
  children: React.ReactNode;
  isCoursePage: boolean;
  courseId: string | null;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const marginLeft = isCollapsed ? "9rem" : "16rem";

  return (
    <div
      className="flex-1 transition-all duration-300"
      style={{ marginLeft }}
    >
      <div
        className={cn(
          "min-h-screen",
          isCoursePage && "bg-customgreys-primarybg"
        )}
      >
        <Navbar isCoursePage={isCoursePage} />
        <div className="flex">
          {courseId && <ChaptersSidebar />}
          <main className="p-8 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <DashboardMain isCoursePage={isCoursePage} courseId={courseId}>
          {children}
        </DashboardMain>
      </div>
    </SidebarProvider>
  );
}

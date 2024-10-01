"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router=useRouter()

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        color={"bg-orange-1"}
        title={"New Meeting"}
        imageSrc={"add-meeting"}
        desc={"Start an instant meeting"}
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        color={"bg-blue-1"}
        title={"Join Meeting"}
        imageSrc={"join-meeting"}
        desc={"Via invitation link"}
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        color={"bg-purple-1"}
        title={"Schedule Meeting"}
        imageSrc={"schedule"}
        desc={"Plan your meeting"}
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        color={"bg-yellow-1"}
        title={"View Recordings"}
        imageSrc={"recordings"}
        desc={"Checkout your meeting recordings"}
        handleClick={() => router.push('/recordings')}
      />
    </section>
  );
};

export default MeetingTypeList;

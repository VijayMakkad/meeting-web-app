"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast"


const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [values,setvalues]=useState({
    dateTime:new Date(),
    desc:'',
    link:''
  })

  const [callDetails,setCallDetails]=useState<Call>()
  const { toast } = useToast()


  const {user}=useUser();
  const client=useStreamVideoClient()

  const createMeeting = async() => {
     if(!client||!user)return;

     try {
      if(!values.dateTime){
        toast({
          title: "Please select date and time",
        })
        return;
      }
      const id=crypto.randomUUID()
      const call=client.call('default',id)
      if(!call)throw new Error('Failed to create call')

        const startsAt=values.dateTime.toISOString()||new Date(Date.now()).toISOString();
        const desc=values.desc||'Instant Meeting'

        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{
              desc
            }
          }
        })
        setCallDetails(call)

        if(!values.desc){
          router.push(`/meeting/${call.id}`)
        }
        toast({
          title: "Meeting Created",
        })
     } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create meeting",
      })
     }
  };


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
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start an Instant Meeting"
        className="text-center "
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;

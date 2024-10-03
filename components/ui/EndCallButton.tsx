"use client";
import { CallingState, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const router = useRouter();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState!==CallingState.JOINED)return <Loader/>

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500 rounded-xl"
    >
      End Call for all
    </Button>
  );
};

export default EndCallButton;

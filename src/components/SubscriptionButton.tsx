"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2, Flame } from "lucide-react";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={handleSubscription}
      variant="outline"
      className="text-primary"
    >
      {loading ? (
        <>
          <p className="text-sm text-slate-400 mr-2">Setting up... </p>
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </>
      ) : props.isPro ? (
        <>
          Manage Subscriptions <Flame className="w-5 h-5 text-orange-500 ml-1" />{" "}
        </>
      ) : (
        <>
          Get Pro <Flame className="w-5 h-5 text-orange-500 ml-1" />
        </>
      )}
    </Button>
  );
};

export default SubscriptionButton;

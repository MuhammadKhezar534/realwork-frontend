import React from "react";
import { useNavigate } from "react-router-dom";
import ExampleChart from "../components/ExampleChart";
import { useStore } from "../store/useStore";
import { Button } from "@/components/ui/button";

function Home() {
  const { count, increment, decrement } = useStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-end gap-2 mb-4">
          <Button onClick={() => navigate("/employees")}>Employees</Button>
          <Button onClick={() => navigate("/commission")}>Commission</Button>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Realwork Dashboard
          </h1>
          <p className="text-muted-foreground">
            React project setup complete with React Router DOM, Zustand, Axios,
            Shadcn UI, and Recharts
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-card-foreground">
            Zustand Store Example
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={decrement}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
            >
              -
            </button>
            <span className="text-2xl font-bold text-foreground">{count}</span>
            <button
              onClick={increment}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Recharts Example
          </h2>
          <ExampleChart />
        </div>
      </div>
    </div>
  );
}

export default Home;

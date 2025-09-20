import React, { useEffect, useState } from "react";
import Background from "../Component/Background";
import { useNavigate } from "react-router-dom";

interface Investment {
  type: string;
  amount: string;
}
interface Debt {
  type: string;
  amount: string;
}
interface FinancialGoal {
  goal: string;
  target_amount: string;
}
interface SpendingCategory {
  category: string;
  monthly_limit: string;
}

interface FormState {
  name: string;
  phone_number: string;
  age: string;
  gender: string;
  location: string;
  income: string;
  income_frequency: string;
  employment_type: string;
  savings: string;
  investments: Investment[];
  debt: Debt[];
  risk_appetite: string;
  financial_goals: FinancialGoal[];
  financial_literacy: string;
  budgeting_habits: string;
  spending_categories: SpendingCategory[];
}

export default function UserForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone_number: "",
    age: "",
    gender: "male",
    location: "",
    income: "",
    income_frequency: "monthly",
    employment_type: "salaried",
    savings: "",
    investments: [{ type: "", amount: "" }],
    debt: [{ type: "", amount: "" }],
    risk_appetite: "medium",
    financial_goals: [{ goal: "", target_amount: "" }],
    financial_literacy: "beginner",
    budgeting_habits: "moderate",
    spending_categories: [{ category: "", monthly_limit: "" }],
  });

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("idToken");

    async function verifyToken() {
      if (token) {
        const response = await fetch('http://localhost:5000/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
        });
        const data = await response.json();
        if (data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate("/login");
        }
      } else {
        setIsLoggedIn(false);
        navigate("/login");
      }
    }

    async function getUserData() {
      try {
        const res = await fetch("http://localhost:5000/user-data", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          redirect: "follow"
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log("Failed to get user data ", err);
      }
    }

    verifyToken();
    getUserData();
  }, [])

  const handleChange = (key: keyof FormState, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleArrayChange = (
    key: "investments" | "debt" | "financial_goals" | "spending_categories",
    index: number,
    field: string,
    value: any
  ) => {
    const updatedArray = [...form[key]];
    (updatedArray[index] as any)[field] = value;
    setForm((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleAddItem = (
    key: "investments" | "debt" | "financial_goals" | "spending_categories",
    template: any
  ) => {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], template] }));
  };

  const handleRemoveItem = (
    key: "investments" | "debt" | "financial_goals" | "spending_categories",
    index: number
  ) => {
    const updatedArray = [...form[key]];
    updatedArray.splice(index, 1);
    setForm((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Form submitted! Check console for data.");
  };

  const renderArrayField = (
    key: "investments" | "debt" | "financial_goals" | "spending_categories",
    items: any[],
    fields: { placeholder: string; fieldName: string; type?: string }[]
  ) => (
    <div className="mt-6">
      <h3 className="font-bold mb-2 victor-mono">
        {key.replace("_", " ").toUpperCase()}
      </h3>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2 items-center">
          {fields.map((f) => (
            <input
              key={f.fieldName}
              type={f.type || "text"}
              placeholder={f.placeholder}
              value={item[f.fieldName]}
              onChange={(e) =>
                handleArrayChange(key, idx, f.fieldName, e.target.value)
              }
              className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none share-tech-mono-regular"
            />
          ))}
          <button
            type="button"
            onClick={() => handleRemoveItem(key, idx)}
            className="text-red-500 font-bold px-2 hover:text-red-700 transition"
          >
            ✖
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const template: any = {};
          fields.forEach((f) => (template[f.fieldName] = ""));
          handleAddItem(key, template);
        }}
        className="text-blue-400 underline mb-4 share-tech-mono-regular"
      >
        + Add {key.replace("_", " ")}
      </button>
    </div>
  );

  return (
    <div className="relative w-screen h-screen overflow-auto share-tech-mono-regular">
      <Background />

      {/* Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap');

          .victor-mono {
            font-family: "Victor Mono", monospace;
          }

          .share-tech-mono-regular {
            font-family: "Share Tech Mono", monospace;
            font-weight: 400;
          }
        `}
      </style>

      <div className="absolute inset-0 flex items-start justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg w-full max-w-3xl text-white"
        >
          <h2 className="text-2xl font-bold mb-6 text-center victor-mono">
            User Financial Form
          </h2>
          <p className="mb-4 share-tech-mono-regular text-white/80">
            Please fill out the following details to help ChatGuru provide you
            with personalized financial guidance.
          </p>

          {/* Basic Inputs */}
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 rounded mb-2 bg-white/30 placeholder-white/70 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={(e) => handleChange("phone_number", e.target.value)}
            className="w-full p-2 rounded mb-2 bg-white/30 placeholder-white/70 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="w-full p-2 rounded mb-2 bg-white/30 placeholder-white/70 focus:outline-none"
          />

          {/* Dynamic Arrays */}
          {renderArrayField("investments", form.investments, [
            { placeholder: "Type", fieldName: "type" },
            { placeholder: "Amount", fieldName: "amount", type: "number" },
          ])}
          {renderArrayField("debt", form.debt, [
            { placeholder: "Type", fieldName: "type" },
            { placeholder: "Amount", fieldName: "amount", type: "number" },
          ])}
          {renderArrayField("financial_goals", form.financial_goals, [
            { placeholder: "Goal", fieldName: "goal" },
            {
              placeholder: "Target Amount",
              fieldName: "target_amount",
              type: "number",
            },
          ])}
          {renderArrayField("spending_categories", form.spending_categories, [
            { placeholder: "Category", fieldName: "category" },
            {
              placeholder: "Monthly Limit",
              fieldName: "monthly_limit",
              type: "number",
            },
          ])}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition victor-mono"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

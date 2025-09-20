import React, { useState } from "react";
import Background from "../Component/Background";

interface Investment {
  type: string;
  amount: number;
}

interface Debt {
  type: string;
  amount: number;
}

interface FinancialGoal {
  goal: string;
  target_amount: number;
}

interface SpendingCategory {
  category: string;
  monthly_limit: number;
}

export default function UserForm() {
  const [form, setForm] = useState({
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

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (
    key: string,
    index: number,
    field: string,
    value: any
  ) => {
    const updatedArray = [...(form as any)[key]];
    updatedArray[index][field] = value;
    setForm((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleAddItem = (key: string, template: any) => {
    setForm((prev) => ({ ...prev, [key]: [...(prev as any)[key], template] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="relative w-screen h-screen overflow-auto">
      <Background />

      <div className="absolute inset-0 flex items-start justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg w-full max-w-3xl text-white"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            User Financial Form
          </h2>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="p-3 rounded bg-white/30 placeholder-white/70 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              className="p-3 rounded bg-white/30 placeholder-white/70 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="p-3 rounded bg-white/30 placeholder-white/70 focus:outline-none"
            />
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="p-3 rounded bg-white/30 focus:outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="p-3 rounded bg-white/30 placeholder-white/70 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Income"
              value={form.income}
              onChange={(e) => handleChange("income", e.target.value)}
              className="p-3 rounded bg-white/30 placeholder-white/70 focus:outline-none"
            />
            <select
              value={form.income_frequency}
              onChange={(e) => handleChange("income_frequency", e.target.value)}
              className="p-3 rounded bg-white/30 focus:outline-none"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <select
              value={form.employment_type}
              onChange={(e) => handleChange("employment_type", e.target.value)}
              className="p-3 rounded bg-white/30 focus:outline-none"
            >
              <option value="salaried">Salaried</option>
              <option value="self_employed">Self-Employed</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Savings"
              value={form.savings}
              onChange={(e) => handleChange("savings", e.target.value)}
              className="p-3 rounded bg-white/30 placeholder-white/70 focus:outline-none"
            />
          </div>

          {/* Investments */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Investments</h3>
            {form.investments.map((inv, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Type"
                  value={inv.type}
                  onChange={(e) =>
                    handleArrayChange(
                      "investments",
                      idx,
                      "type",
                      e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={inv.amount}
                  onChange={(e) =>
                    handleArrayChange(
                      "investments",
                      idx,
                      "amount",
                      e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAddItem("investments", { type: "", amount: "" })
              }
              className="text-blue-400 underline mb-4"
            >
              + Add Investment
            </button>
          </div>

          {/* Debt */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Debt</h3>
            {form.debt.map((d, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Type"
                  value={d.type}
                  onChange={(e) =>
                    handleArrayChange("debt", idx, "type", e.target.value)
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={d.amount}
                  onChange={(e) =>
                    handleArrayChange("debt", idx, "amount", e.target.value)
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem("debt", { type: "", amount: "" })}
              className="text-blue-400 underline mb-4"
            >
              + Add Debt
            </button>
          </div>

          {/* Risk Appetite */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={form.risk_appetite}
              onChange={(e) => handleChange("risk_appetite", e.target.value)}
              className="p-3 rounded bg-white/30 focus:outline-none"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <select
              value={form.financial_literacy}
              onChange={(e) =>
                handleChange("financial_literacy", e.target.value)
              }
              className="p-3 rounded bg-white/30 focus:outline-none"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select
              value={form.budgeting_habits}
              onChange={(e) => handleChange("budgeting_habits", e.target.value)}
              className="p-3 rounded bg-white/30 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Financial Goals */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Financial Goals</h3>
            {form.financial_goals.map((goal, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Goal"
                  value={goal.goal}
                  onChange={(e) =>
                    handleArrayChange(
                      "financial_goals",
                      idx,
                      "goal",
                      e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Target Amount"
                  value={goal.target_amount}
                  onChange={(e) =>
                    handleArrayChange(
                      "financial_goals",
                      idx,
                      "target_amount",
                      e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAddItem("financial_goals", {
                  goal: "",
                  target_amount: "",
                })
              }
              className="text-blue-400 underline mb-4"
            >
              + Add Goal
            </button>
          </div>

          {/* Spending Categories */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Spending Categories</h3>
            {form.spending_categories.map((cat, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Category"
                  value={cat.category}
                  onChange={(e) =>
                    handleArrayChange(
                      "spending_categories",
                      idx,
                      "category",
                      e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Monthly Limit"
                  value={cat.monthly_limit}
                  onChange={(e) =>
                    handleArrayChange(
                      "spending_categories",
                      idx,
                      "monthly_limit",
                      e.target.value
                    )
                  }
                  className="flex-1 p-2 rounded bg-white/30 placeholder-white/70 focus:outline-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAddItem("spending_categories", {
                  category: "",
                  monthly_limit: "",
                })
              }
              className="text-blue-400 underline mb-4"
            >
              + Add Category
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import API from "../lib/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { motion } from "framer-motion";

export default function OwnerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/owner/dashboard").then((r) => {
      setData(r.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {/* 🔄 Loading state (skeleton shimmer) */}
        {loading && (
          <>
            <div className="card animate-pulse bg-yellow-100 border border-yellow-200">
              <div className="h-4 bg-yellow-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-yellow-200 rounded w-1/3"></div>
            </div>
            <div className="card animate-pulse bg-yellow-100 border border-yellow-200">
              <div className="h-4 bg-yellow-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-yellow-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-yellow-200 rounded w-3/4"></div>
            </div>
          </>
        )}

        {/* ✅ Loaded dashboard */}
        {!loading && (
          <>
            {/* Store card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="card border border-yellow-200 hover:bg-yellow-50 hover:shadow-lg"
            >
              <h2 className="font-semibold text-yellow-900">
                Store: {data?.store?.name ?? "—"}
              </h2>
              <div className="text-sm text-yellow-700">
                Average rating:{" "}
                <b className="text-yellow-800">
                  {data?.averageRating?.toFixed
                    ? data.averageRating.toFixed(2)
                    : "—"}
                </b>
              </div>
            </motion.div>

            {/* Raters table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card border border-yellow-200"
            >
              <h3 className="font-semibold mb-2 text-yellow-900">Raters</h3>
              <table className="table border border-yellow-200">
                <thead className="bg-yellow-100">
                  <tr>
                    <th className="th text-left text-yellow-800">Name</th>
                    <th className="th text-left text-yellow-800">Email</th>
                    <th className="th text-left text-yellow-800">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.raters?.map((r: any) => (
                    <motion.tr
                      key={r.id}
                      whileHover={{ backgroundColor: "#FEF9C3" }} // hover:bg-yellow-100
                      transition={{ duration: 0.2 }}
                      className="tr-hover"
                    >
                      <td className="td text-yellow-900">{r.name}</td>
                      <td className="td text-yellow-700">{r.email}</td>
                      <td className="td text-yellow-800 font-semibold">
                        {r.value}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

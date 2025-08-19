import { useEffect, useState } from "react";
import API from "../lib/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stores").then((r) => {
      setStores(r.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      {/* Page Transition Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-bold text-yellow-800">All Stores</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* 🔄 Loading Shimmer Skeleton */}
          {loading &&
            [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="card animate-pulse bg-yellow-100 border border-yellow-200"
              >
                <div className="h-4 bg-yellow-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-yellow-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-yellow-200 rounded w-1/4"></div>
              </motion.div>
            ))}

          {/* ✅ Loaded Stores */}
          {!loading &&
            stores.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="card border border-yellow-200 hover:shadow-lg hover:bg-yellow-50"
              >
                <div className="font-semibold text-yellow-900">{s.name}</div>
                <div className="text-sm text-yellow-700">{s.address}</div>
                <div className="mt-2 text-sm text-yellow-800">
                  Avg: <b>{s.overallRating?.toFixed(2) ?? "—"}</b>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

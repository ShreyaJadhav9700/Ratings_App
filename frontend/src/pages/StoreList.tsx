import { useEffect, useState } from "react";
import API from "../lib/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { motion } from "framer-motion";

export default function StoreList() {
  const [stores, setStores] = useState<any[]>([]);
  const [qName, setQName] = useState("");
  const [qAddress, setQAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await API.get("/stores", { params: { qName, qAddress } });
    setStores(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const rate = async (id: number, value: number) => {
    await API.post("/ratings", { storeId: id, value });
    await load();
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* 🔎 Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card space-y-2 border border-yellow-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              className="input border-yellow-300 focus:ring-yellow-500"
              placeholder="Search by name"
              value={qName}
              onChange={(e) => setQName(e.target.value)}
            />
            <input
              className="input border-yellow-300 focus:ring-yellow-500"
              placeholder="Search by address"
              value={qAddress}
              onChange={(e) => setQAddress(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="btn bg-yellow-600 text-white border border-yellow-700 hover:bg-yellow-700"
              onClick={load}
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {/* ⚡ Loading Skeletons */}
        {loading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="card animate-pulse bg-yellow-100 border border-yellow-200"
              >
                <div className="h-4 bg-yellow-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-yellow-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-yellow-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Loaded Stores */}
        {!loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="space-y-3"
          >
            {stores.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="card border border-yellow-200 hover:shadow-lg hover:bg-yellow-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-yellow-900">{s.name}</div>
                    <div className="text-sm text-yellow-700">{s.address}</div>
                  </div>
                  <div className="text-sm text-yellow-800">
                    Overall:{" "}
                    <b>
                      {s.overallRating ? s.overallRating.toFixed(2) : "—"}
                    </b>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm mb-1 text-yellow-900">
                    Your rating:{" "}
                    <b className="text-yellow-800">{s.myRating ?? "none"}</b>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <motion.button
                        key={v}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className={`btn px-3 py-1 border ${
                          s.myRating === v
                            ? "bg-yellow-600 text-white border-yellow-700"
                            : "border-yellow-300 hover:bg-yellow-100 text-yellow-800"
                        }`}
                        onClick={() => rate(s.id, v)}
                      >
                        {v}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

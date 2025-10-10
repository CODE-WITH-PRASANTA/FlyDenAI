import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="FlyDenAi Admin Dashboard | Intelligent Business Management Panel"
        description="FlyDenAi Admin Dashboard – Monitor analytics, manage sales insights, track revenue goals, and control intelligent business operations with precision and AI-powered insights."
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left Section: Metrics + Charts */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        {/* Right Section: Monthly Targets */}
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        {/* Statistics Section */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* Demographics & Orders Section */}
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}

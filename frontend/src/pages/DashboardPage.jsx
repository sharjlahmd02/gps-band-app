import React from 'react';
import { Header } from '../components/Header';
import { AlertBanner } from '../components/AlertBanner';
import { MetricCards } from '../components/MetricCards';
import { LiveMapOverview } from '../components/LiveMapOverview';
import { ChildCard } from '../components/ChildCard';
import { RecentAlerts } from '../components/RecentAlerts';
import { useApp } from '../context/AppContext';

export const DashboardPage = () => {
  const { children } = useApp();

  return (
    <div className="dashboard-page">
      {/* 1. Header with Dashboard title and 2 Active Alerts pill */}
      <Header title="Dashboard" />

      {/* 2. Urgent Attention Banner */}
      <AlertBanner />

      {/* 3. 4 KPI Metric Cards */}
      <MetricCards />

      {/* 4. Middle Section (2 Columns: Live Map Overview & Children Quick Status) */}
      <div className="dashboard-columns">
        <LiveMapOverview />

        <div className="children-cards-column">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      </div>

      {/* 5. Bottom Section: Recent Alerts */}
      <RecentAlerts />
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Playground from './pages/Playground';
import ConfigBuilder from './pages/ConfigBuilder';
import CheatSheet from './pages/CheatSheet';
import Assessment from './pages/Assessment';
import Blog from './pages/Blog';
import FeatureGuide from './pages/FeatureGuide';
import { Toaster } from './components/ui/sonner';

import { DynamicDataProvider } from './context/DynamicDataContext';

export default function App() {
  return (
    <DynamicDataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/feature/:id" element={<FeatureGuide />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/config" element={<ConfigBuilder />} />
            <Route path="/cheat-sheet" element={<CheatSheet />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </DynamicDataProvider>
  );
}


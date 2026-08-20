"""Unit tests for ADK agent definitions, tools, and report exporter."""

import unittest
from pathlib import Path

from brand_search_optimization.agent import root_agent
from brand_search_optimization.sub_agents.comparison.agent import (
    comparison_critic_agent,
    comparison_generator_agent,
    comparison_root_agent,
)
from brand_search_optimization.sub_agents.keyword_finding.agent import keyword_finding_agent
from brand_search_optimization.sub_agents.search_results.agent import search_results_agent
from brand_search_optimization.tools.report_exporter import (
    export_brand_optimization_report,
    generate_html_report,
)
from brand_search_optimization.tools.web_search import get_top_search_results


class TestAgentsAndTools(unittest.TestCase):
    def test_agent_hierarchy_and_subagents(self):
        """Verifies that the multi-agent hierarchy is properly wired."""
        self.assertEqual(root_agent.name, "brand_search_optimization")
        sub_agent_names = [a.name for a in root_agent.sub_agents]
        self.assertIn("keyword_finding_agent", sub_agent_names)
        self.assertIn("search_results_agent", sub_agent_names)
        self.assertIn("comparison_root_agent", sub_agent_names)

    def test_reflection_loop_agents(self):
        """Verifies that the comparison supervisor contains generator and critic agents."""
        comp_subagent_names = [a.name for a in comparison_root_agent.sub_agents]
        self.assertIn("comparison_generator_agent", comp_subagent_names)
        self.assertIn("comparison_critic_agent", comp_subagent_names)

    def test_web_search_tool_results(self):
        """Verifies that the web search tool returns structured markdown benchmark results."""
        results = get_top_search_results("white bookcase with adjustable shelves", num_results=2)
        self.assertIn("Top Competitor Title", results)
        self.assertIn("Bookcase", results)

    def test_report_exporter(self):
        """Verifies report generation and export to markdown and HTML."""
        sample_md = "# Sample Test Report\n\n- Testing report export."
        paths = export_brand_optimization_report(sample_md, brand="IKEA_TEST", output_dir="reports/test_output")
        
        md_file = Path(paths["markdown_path"])
        html_file = Path(paths["html_path"])

        self.assertTrue(md_file.exists())
        self.assertTrue(html_file.exists())

        # Cleanup test files
        md_file.unlink(missing_ok=True)
        html_file.unlink(missing_ok=True)
        Path(paths["latest_markdown_path"]).unlink(missing_ok=True)


if __name__ == "__main__":
    unittest.main()

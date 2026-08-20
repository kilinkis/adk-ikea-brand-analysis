"""Defines the Root Brand Search Optimization Coordinator Agent."""

try:
    from google.adk.agents.llm_agent import Agent
except ImportError:
    class Agent:  # type: ignore
        def __init__(self, name: str, description: str, instruction: str, tools=None, sub_agents=None, model=None):
            self.name = name
            self.description = description
            self.instruction = instruction
            self.tools = tools or []
            self.sub_agents = sub_agents or []
            self.model = model

from . import prompt
from .shared_libraries import constants
from .sub_agents.comparison.agent import comparison_root_agent
from .sub_agents.keyword_finding.agent import keyword_finding_agent
from .sub_agents.search_results.agent import search_results_agent
from .tools.catalog_connector import get_product_details_for_brand
from .tools.report_exporter import export_brand_optimization_report
from .tools.web_search import get_top_search_results

root_agent = Agent(
    model=constants.MODEL,
    name="brand_search_optimization",
    description="Orchestrates multi-agent brand search optimization and product title enrichment.",
    instruction=prompt.ROOT_PROMPT,
    sub_agents=[
        keyword_finding_agent,
        search_results_agent,
        comparison_root_agent,
    ],
    tools=[
        get_product_details_for_brand,
        get_top_search_results,
        export_brand_optimization_report,
    ],
)

"""Defines the Keyword Finding Agent for catalog querying and shopper query mining."""

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

from ...shared_libraries import constants
from ...tools import catalog_connector
from . import prompt

keyword_finding_agent = Agent(
    model=constants.MODEL,
    name="keyword_finding_agent",
    description="Extracts catalog product data for a brand and discovers high-intent shopper search keywords.",
    instruction=prompt.KEYWORD_FINDING_AGENT_PROMPT,
    tools=[
        catalog_connector.get_product_details_for_brand,
    ],
)

"""Defines the Search Results Agent for competitor search benchmarking."""

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
from ...tools import web_search
from . import prompt

search_results_agent = Agent(
    model=constants.MODEL,
    name="search_results_agent",
    description="Searches e-commerce platforms and extracts top ranking competitor titles and metadata.",
    instruction=prompt.SEARCH_RESULT_AGENT_PROMPT,
    tools=[
        web_search.get_top_search_results,
        web_search.go_to_url,
        web_search.scroll_down_screen,
        web_search.get_page_source,
    ],
)

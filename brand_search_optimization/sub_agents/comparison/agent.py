"""Defines the Comparison Supervisor, Generator, and Critic reflection agents."""

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
from ...tools import report_exporter
from . import prompt

# Generator Agent: drafts title enrichments and gap analysis
comparison_generator_agent = Agent(
    model=constants.MODEL,
    name="comparison_generator_agent",
    description="Drafts title optimizations, missing keyword gap analysis, and e-commerce title recommendations.",
    instruction=prompt.COMPARISON_AGENT_PROMPT,
)

# Critic Agent: reviews, audits, and critiques recommendations
comparison_critic_agent = Agent(
    model=constants.MODEL,
    name="comparison_critic_agent",
    description="Audits proposed title enrichments for brand voice integrity, accuracy, and SEO balance.",
    instruction=prompt.COMPARISON_CRITIC_AGENT_PROMPT,
)

# Supervisor Root Agent: coordinates the Generator-Critic reflection loop
comparison_root_agent = Agent(
    model=constants.MODEL,
    name="comparison_root_agent",
    description="Coordinates title comparison and orchestrates the Generator-Critic reflection loop.",
    instruction=prompt.COMPARISON_ROOT_AGENT_PROMPT,
    sub_agents=[comparison_generator_agent, comparison_critic_agent],
    tools=[report_exporter.export_brand_optimization_report],
)

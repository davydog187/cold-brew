defmodule ColdBrew do
  @moduledoc """
  Documentation for ColdBrew.
  """

  @prefix "data/input/"

  def defense do
    :defense
    |> filename
    |> read_file(&parse_defense/1)
    |> output(:defense)
  end

  def kickers do
    :kickers
    |> filename
    |> read_file(&parse_kicker/1)
    |> output(:kickers)
  end

  defp parse_kicker([name]) when name != "" do
    %{name: name, position: "kicker"}
  end
  defp parse_kicker(thing), do: nil

  def qbs do
    :qbs
    |> filename
    |> read_file(&parse_qb/1)
    |> output(:qbs)
  end

  def rbs do
    :rbs
    |> filename
    |> read_file(&parse_rb/1)
    |> output(:rbs)
  end

  def wrs do
    :wrs
    |> filename
    |> read_file(&parse_wr/1)
    |> output(:wrs)
  end

  def tes do
    :tes
    |> filename
    |> read_file(&parse_te/1)
    |> output(:tes)
  end

  defp read_file(filename, parser) do
    filename
    |> File.read!
    |> String.split("\n")
    |> Enum.map(fn line ->
      line
      |> String.split("\t")
      |> parser.()
    end)
    |> Enum.reject(& &1 == nil or &1 == [""] or &1 == "")
  end

  defp parse_defense([name, bye, tier]) do
    %{
      name: name,
      bye: bye,
      position: "defense",
      tier: tier
    }
  end

  defp parse_defense(stuff) do
    IO.inspect stuff, label: "dropping"
    nil
  end

  defp parse_qb([
    name,
    _,
    tm_bw,
    rank,
    adp,
    position_rank,
    value,
    std_dev,
    sk,
    scarcity,
    tier
  ]) do
    %{
      name: name,
      tm_bw: tm_bw,
      rank: rank,
      adp: adp,
      position: "qb",
      position_rank: position_rank,
      value: value,
      std_dev: std_dev,
      sk: sk,
      scarcity: scarcity,
      tier: tier
    }
  end

  defp parse_qb(stuff) do
    IO.inspect stuff, label: "dropping"
    nil
  end

  defp parse_rb([
    name,
    _,
    tm_bw,
    rank,
    adp,
    position_rank,
    value,
    std_dev,
    sk,
    scarcity,
    tier
  ]) do
    %{
      name: name,
      tm_bw: tm_bw,
      rank: rank,
      adp: adp,
      position: "rb",
      position_rank: position_rank,
      value: value,
      std_dev: std_dev,
      sk: sk,
      scarcity: scarcity,
      tier: tier
    }
  end

  defp parse_rb(stuff) do
    IO.inspect stuff, label: "dropping"
    nil
  end

  defp parse_wr([
    name,
    tm_bw,
    rank,
    adp,
    position_rank,
    value,
    std_dev,
    sk,
    scarcity,
  ]) do
    %{
      name: name,
      tm_bw: tm_bw,
      rank: rank,
      adp: adp,
      position: "wr",
      position_rank: position_rank,
      value: value,
      std_dev: std_dev,
      sk: sk,
      scarcity: scarcity,
    }
  end

  defp parse_wr(stuff) do
    IO.inspect stuff, label: "dropping"
  end

  defp parse_te([
    name,
    tm_bw,
    rank,
    adp,
    position_rank,
    value,
    std_dev,
    sk,
    scarcity,
    tier
  ]) do
    %{
      name: name,
      tm_bw: tm_bw,
      rank: rank,
      adp: adp,
      position: "te",
      position_rank: position_rank,
      value: value,
      std_dev: std_dev,
      sk: sk,
      scarcity: scarcity,
      tier: tier
    }
  end

  defp parse_te(stuff) do
    IO.inspect stuff, label: "dropping"
  end
  defp output(data, filename) do
    data = Poison.encode!(data)

    File.write!("data/output/" <> to_string(filename) <> ".json", data)
  end

  defp filename(type) do
    Path.join(@prefix, to_string(type) <> ".csv")
  end
end

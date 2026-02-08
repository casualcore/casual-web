<script lang="ts">
  import CircleIcon from "@lucide/svelte/icons/circle";
  import { Badge } from "../ui/badge";

  const {
    state
  }: {
    state: number
  } = $props();

  /*
    // middleware/domain/include/domain/manager/admin/model.h

    namespace instance
    {
      enum class State : int
      {
          disabled,
          running,
          scale_out,
          scale_in,
          exit,
          error,
      };

      constexpr std::string_view description( State state)
      {
          switch( state)
          {
            case State::disabled: return "disabled";
            case State::running: return "running";
            case State::scale_out: return "scale-out";
            case State::scale_in: return "scale-in";
            case State::exit: return "exit";
            case State::error: return "error";
          }
          return "<unknown>";
      }
    } // instance
  */
</script>

<Badge variant="outline" class="text-muted-foreground">
  {#if state === 0}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    Disabled
  {:else if state === 1}
    <CircleIcon class="stroke-0 fill-green-500 dark:fill-green-400" />
    Running
  {:else if state === 2}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    Scale-in
  {:else if state === 3}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    Scale-out
  {:else if state === 4}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    Exit
  {:else if state === 5}
    <CircleIcon class="stroke-0 fill-red-500 dark:fill-red-400" />
    Error
  {:else}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    {"<unknown>"} ({state})
  {/if}
</Badge>

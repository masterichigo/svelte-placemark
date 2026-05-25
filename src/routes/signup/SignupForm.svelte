
<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import { apiService } from "$lib/services/api-service";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {
    try {
      message = "";
      const success = await apiService.signup({ firstName, lastName, email, password });
      if (success) {
        goto("/report");
      } else {
        message = "Error Trying to sign up";
      }
    } catch (err) {
      message = err?.message || "Unexpected error during signup.";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button on:click={signup} class="button is-primary is-fullwidth">Sign Up</button>
  <p class="has-text-centered">
    Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
  </p>
</div>

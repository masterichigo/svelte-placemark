<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { clearDonationState } from "$lib/services/utils";

  clearDonationState();
  if (browser) goto("/");
</script>  
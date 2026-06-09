# README #

This is the Asternic CDR IssabelPBX and FPBX Module

> **Community Fork Notice:** This fork (`carlswart/asternic-cdr-module`) contains **FreePBX 17 / PHP 8.2 compatibility patches** that are not yet merged upstream. If you are running FreePBX 14-16 with PHP 7, the original upstream version should work fine.

### What is this repository for? ###

* Provides an alternative way to present CDR reports for Issabel and FPBX

---

## FreePBX 17 / PHP 8 Compatibility

The upstream v1.6.6 was released in October 2024 but was not fully tested against FreePBX 17's default environment (PHP 8.2, Whoops error handler, PJSIP channels, and the new CDR recording pipeline). This fork applies 8 patches to fix fatal errors, warnings, and missing functionality.

### What was broken

| Symptom | FreePBX 17 Trigger |
|---|---|
| **Whoops crash on drill-down** | `Undefined array key "type"` in `getrecords` AJAX handler (PHP 8 E_WARNING → Whoops exception) |
| **Missing recording icons on outgoing calls** | FreePBX 17 does not populate `recordingfile` in CDR for outgoing calls; only incoming |
| **PDF export crash** | `Trying to access array offset on value of type null` in `PDF::Footer()` (missing locale globals) |
| **PDF Combined report corruption** | Column mismatch: 12 data columns vs 11 header columns |
| **FPDF fatal error** | `each()` function removed in PHP 8.1 |
| **Distribution heatmap blank/Whoops** | Color index overflow when daily call count exceeds 7 |
| **Unescaped superglobals in HTML** | `$_SERVER['REQUEST_URI']` and `$_REQUEST` echoed raw into forms and JS — XSS risk |
| **Dead Flash code** | Legacy `swf_bar_old()` function referenced non-existent `.swf` files and triggered `html_entity_decode()` deprecation |

### Patches applied

| Patch | Commit | Files | Fix |
|-------|--------|-------|-----|
| **PATCH-001** | `6b54b0b` | `functions.inc.php` | Add null-coalescing defaults for `$_REQUEST['type']` and `$_REQUEST['display']` |
| **PATCH-002** | `a09b4b6` | `functions.inc.php` | Add CEL session + disk `glob()` fallback for missing `recordingfile` paths |
| **PATCH-003** | `6978961` | `functions.inc.php` | Guard `PDF::Footer()` against null `$lang` array |
| **PATCH-004** | `4f4cbfd` | `functions.inc.php` + `page.asternic_cdr.php` | Fix Combined report PDF column mismatch |
| **PATCH-005** | `75840ed` | `lib/fpdf.php` | Replace deprecated `each()` with `foreach()` |
| **PATCH-006** | `e1e8507` | `page.asternic_cdr.php` | Cap color index in Distribution heatmap |
| **PATCH-007** | `d779b70` | `functions.inc.php` + `page.asternic_cdr.php` | Escape `$_SERVER['REQUEST_URI']` and `$_REQUEST` loop output with `htmlspecialchars()` |
| **PATCH-008** | `98d0882` | `functions.inc.php` | Remove dead Adobe Flash `swf_bar_old()` function |

### Tested functionality

- [x] Module loading / Module Admin
- [x] Outgoing / Incoming / Combined report charts
- [x] Drill-down detail table
- [x] Recording icons — incoming & outgoing
- [x] Call recording playback (Howler.js) — both directions
- [x] Call recording download — both directions
- [x] PDF export (all report types)
- [x] CSV export
- [x] Distribution hourly heatmap

### Installation

#### Method A: Direct tarball install (easiest)

1. Download the latest release `.tgz` from [Releases](../../releases)
2. Copy to your FreePBX server:
   ```bash
   scp asternic_cdr-1.6.6-fpbx17-patched.tgz root@freepbx:/tmp/
   ```
3. Install via FreePBX CLI:
   ```bash
   ssh root@freepbx
   fwconsole ma delete asternic_cdr   # if older version exists
   fwconsole ma installlocal /tmp/asternic_cdr-1.6.6-fpbx17-patched.tgz
   fwconsole reload
   ```

#### Method B: Install from git

```bash
ssh root@freepbx
cd /var/www/html/admin/modules
git clone https://github.com/carlswart/asternic-cdr-module.git asternic_cdr
fwconsole ma install asternic_cdr
fwconsole reload
```

#### Method C: Manual file copy (for quick testing)

If you already have the upstream module installed and only want to patch the changed files:

```bash
# From your dev machine
cd asternic-cdr-module-1.6.6
scp functions.inc.php root@freepbx:/var/www/html/admin/modules/asternic_cdr/
scp page.asternic_cdr.php root@freepbx:/var/www/html/admin/modules/asternic_cdr/
scp lib/fpdf.php root@freepbx:/var/www/html/admin/modules/asternic_cdr/lib/
# No reload needed — PHP is interpreted per-request
```

### Upstream status

These patches are intended to be submitted as a pull request to [asternic/asternic-cdr-module](https://github.com/asternic/asternic-cdr-module). Until merged, this fork serves as a community-maintained compatibility release.

---

### How do I get set up? (Original IssabelPBX instructions)

Select the Security option from your Issabel menu and be sure to allow unembed access to Issabel PBX.
Then go to http://your.server/admin to log into IssabelPBX directly, and from the module manager you 
will be able to upload the module and install it on your system.


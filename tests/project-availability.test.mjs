import test from 'node:test';
import assert from 'node:assert/strict';
import { projectAvailability } from '../src/lib/projectAvailability.mjs';

test('legacy preview and video fields cannot expose vendor, Drive or unapproved media URLs', () => {
  for (const [slug, livePreview] of [
    ['reconciliation-rpa', 'https://make.powerautomate.com/'],
    ['ai-accountant', 'https://n8n.io/'],
    ['k2theme', 'https://drive.google.com/file/example'],
    ['new-project', 'https://example.org/'],
  ]) {
    const result = projectAvailability({ slug, livePreview, video: 'https://youtu.be/example', projectImg: ['/gallery.png'] });
    assert.equal(result.liveUrl, null, slug);
    assert.equal(result.videoUrl, null, slug);
    assert.equal(result.hasGallery, true, slug);
  }
});

test('an approved public website and a synthetic lab have distinct destinations', () => {
  const publicProject = projectAvailability({ slug: 'diergasia', livePreview: 'https://n8n.io/' });
  assert.equal(publicProject.liveUrl, 'https://diergasia.com/');
  assert.equal(publicProject.isLab, false);
  const lab = projectAvailability({ slug: 'sign-in-triage-lab' });
  assert.equal(lab.isLab, true);
  assert.equal(lab.liveUrl, null);
  assert.equal(lab.hasGallery, false);
  assert.equal(lab.label, 'Synthetic lab');
});
